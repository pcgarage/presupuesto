import { Component, OnInit } from '@angular/core';

import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { faMouse } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faHdd } from '@fortawesome/free-solid-svg-icons';
import { faSdCard } from '@fortawesome/free-solid-svg-icons';
import { faCarBattery } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faFan } from '@fortawesome/free-solid-svg-icons';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { faMemory } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faChair } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    faMapMarkedAlt = faMapMarkedAlt;
    faPhoneAlt = faPhoneAlt;
    faEnvelope = faEnvelope;

    faMouse = faMouse;
    faKeyboard = faKeyboard;
    faHeadphones = faHeadphones;
    faDesktop = faDesktop;
    faHdd = faHdd;
    faSdCard = faSdCard;
    faCarBattery = faCarBattery;
    faMobile = faMobile;
    faFan = faFan;
    faMicrochip = faMicrochip;
    faMemory = faMemory;
    faLayerGroup = faLayerGroup;
    faSquare = faSquare;
    faChair = faChair;

    constructor() { }

    ngOnInit() {
    }

}
