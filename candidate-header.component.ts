import {Component, Input} from '@angular/core';
import {CandidateFull} from '../../models/interface/full-candidate';

@Component({
  selector: 'app-candidate-header',
  templateUrl: './candidate-header.component.html',
  styleUrls: ['./candidate-header.component.scss']
})
export class CandidateHeaderComponent {
  @Input() candidate: CandidateFull;
  @Input() typePage: string;
  uploadNewImage = false;
  constructor() { }
}
