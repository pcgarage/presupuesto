import frappe
import json

from random import SystemRandom
from twilio.rest import Client


@frappe.whitelist(allow_guest=True)
def confirm(token, code):

    #######################################################################################################################################

    command = "confirm"

    # ERRORS:
    # 1 - MANDATORY TOKEN
    # 2 - INVALID TOKEN
    # 3 - INVALID ORDER

    error_messages = {
        "1": "Token obligatorio.",
        "2": "Token invalido.",
        "3": "Solicitud ya confirmada.",
        "4": "Código inválido."
    }

    #######################################################################################################################################

    if not token:
        return {"error": {"code": "1", "message": error_messages["1"], "command": command}}

    if not frappe.db.exists("Computer Quotation", {"token": token}):
        return {"error": {"code": "2", "message": error_messages["2"], "command": command}}

    quotation = frappe.get_doc("Computer Quotation", {"token": token})

    if quotation.confirmation_status == "Confirmed":
        return {"error": {"code": "3", "message": error_messages["3"], "command": command}}

    if not quotation.confirmation_code == code:
        return {"error": {"code": "4", "message": error_messages["4"], "command": command}}

    quotation.confirmation_status = "Confirmed"
    quotation.flags.ignore_permissions = True
    quotation.save()
    frappe.db.commit()

    frappe.sendmail(recipients=quotation.contact_email,
                    subject="Solicitud de Presupuesto confirmada!",
                    template="quotation_request_confirmed",
                    args={"doc": quotation},
                    header=["Confirmación de Presupuesto", "green"], delayed=False)

    return {"message": "Éxito!", "error": False, "command": command}

@frappe.whitelist(allow_guest=True)
def check(token):

    #######################################################################################################################################

    command = "check_order_status"

    # ERRORS:
    # 1 - MANDATORY TOKEN
    # 2 - INVALID ORDER
    # 3 - ALREADY CONFIRMED

    error_messages = {
        "1": "Token obligatorio.",
        "2": "Token invalido.",
        "3": "Solicitud ya confirmada."
    }

    #######################################################################################################################################

    if not id:
        return {"error": {"code": "1", "message": error_messages["1"], "command": command}}

    if not frappe.db.exists("Computer Quotation", {"token": token}):
        return {"error": {"code": "2", "message": error_messages["2"], "command": command}}

    if frappe.get_value("Computer Quotation", {"token": token}, "confirmation_status") == "Confirmed":
        return {"error": {"code": "3", "message": error_messages["3"], "command": command}}

    return {"message": "Éxito!", "error": False, "command": command}


@frappe.whitelist(allow_guest=True)
def insert(
    contact,
    budget=None,
    components=None,
    date=None
):

    #######################################################################################################################################

    command = "insert"

    # ERRORS:
    # 1 - MANDATORY: NAME
    # 2 - MANDATORY: TEL
    # 3 - MANDATORY: EMAIL
    # 4 - INVALID: BUDGET
    # 5 - INVALID: COMPONENTS
    # 6 - INVALID: DATE

    error_messages = {
        "1": "Nombre obligatorio.",
        "2": "Telefono obligatorio.",
        "3": "E-mail obligatorio.",
        "4": "Presupuesto inválido.",
        "5": "Componente(s) inválido(s).",
        "6": "Fecha o urgencia obligatoria.",
        "7": "Fecha o urgencia invalida."
    }

    #######################################################################################################################################

    c = json.loads(contact)

    if not c['name']:
        return {"error": {"code": "1", "message": error_messages["1"], "command": command}}

    if not c['tel']:
        return {"error": {"code": "2", "message": error_messages["2"], "command": command}}

    if not c['email']:
        return {"error": {"code": "3", "message": error_messages["3"], "command": command}}

    date = json.loads(date)

    if not date['date'] and not date['urgency']:
        return {"error": {"code": "4", "message": error_messages["4"], "command": command}}

    quotation = frappe.get_doc({
        "token": frappe.generate_hash(length=56),
        "doctype": "Computer Quotation",
        "status": "Registrado",
        "contact_name": c['name'],
        "contact_tel": c['tel'],
        "contact_email": c['email'],
        "budget": budget,
        "delivery_date": date['date'],
        "urgency": "Very Urgent (2-4 days)" if date['urgency'] == "very-urgent" else "Urgent (5-7 days)" if date['urgency'] == "urgent" else None
    })

    if components:

        items = json.loads(components)

        for item in items:

            quotation.append("items", {
                "category": item['category'],
                "requested_item": item['description']
            })

    code = "".join(SystemRandom().choice('123456789') for _ in range(6))

    quotation.confirmation_code = code

    quotation.flags.ignore_permissions = True
    quotation.flags.ignore_mandatory = True
    quotation.insert()

    frappe.db.commit()

    account_sid = 'AC92cb161a7c8e888194274fdff0a4591c'
    auth_token = '55b35e64ecb94cf2acefaab8038e35b5'
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        from_="+16575005100",
        body="PC Garage\nCodigo de confirmacion: " + quotation.confirmation_code +
        "\nO haga clic aquí:\npresupuesto.pcgaragepy.com/confirmation/" +
        quotation.token + "?code=" + quotation.confirmation_code,
        to="+" + c['tel']
    )

    frappe.sendmail(recipients=c['email'],
                    subject="Confirmación de Presupuesto",
                    template="quotation_request_confirmation",
                    args={
                        "link": 'https://presupuesto.pcgaragepy.com/confirmation/' + quotation.token + "?code=" + code, "code": code, "name": c['name']
                    },
                    header=["Confirmación de Presupuesto", "green"], delayed=False)

    return {"message": "Éxito!", "error": False, "command": command, "token": quotation.token}
