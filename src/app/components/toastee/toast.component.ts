import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {
  AlignDirective, ButtonCloseDirective, Colors,
  GutterDirective,
  ProgressBarComponent,
  ProgressBarDirective, ProgressComponent, RowComponent,
  ToastBodyComponent,
  ToastCloseDirective,
  ToastComponent,
  ToasterService,
  ToastHeaderComponent
} from "@coreui/angular";
import {NgIf} from "@angular/common";
import {IconDirective} from "@coreui/icons-angular";

@Component({
  selector: 'app-toast',
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => AppToastComponent) }],
  standalone: true,
  imports: [
    ToastHeaderComponent,
    ToastBodyComponent,
    ToastCloseDirective,
    ProgressBarDirective,
    ProgressComponent,
    ProgressBarComponent,
    NgIf,
    IconDirective,
    RowComponent,
    GutterDirective,
    AlignDirective,
    ButtonCloseDirective
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class AppToastComponent extends ToastComponent implements OnChanges {

  @Input() closeButton = true;
  @Input() title = '';
  @Input() detail = '';
  @Input() icon = ''
  @Input() severity = ''

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.severity)
  }


  getIcon(color: Colors | undefined) {
    switch (color) {
      case 'danger': return 'cilXCircle';
      case 'info': return 'cilInfo';
      case 'warning': return 'cilWarning';
      case 'success': return 'cilCheckAlt';
      case 'primary': return '';
      case 'secondary': return '';
      default: return '';
    }
  }
}
