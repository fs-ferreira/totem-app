import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../core/model/confirm-dialog-model';

@Component({
  selector: 'app-confirm-dialog',
  imports: [UiModule],
  template: `
  <h2 mat-dialog-title class="!font-medium ">{{ data.title || 'Confirmação' }}</h2>

  <mat-dialog-content>
    <p class="text-base">{{ data.message }}</p>
  </mat-dialog-content>

  <mat-dialog-actions align="end">
    <button mat-button (click)="onCancel()" tabIndex="-1" class="!text-(--mat-sys-secondary)" >
      {{ data.cancelText || 'Cancelar' }}
    </button>
    <button mat-flat-button (click)="onConfirm()" tabIndex="-1" class="!rounded-xl">
      {{ data.confirmText || 'Confirmar' }}
    </button>
  </mat-dialog-actions>
  `,
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
