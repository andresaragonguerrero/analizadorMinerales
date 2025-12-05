import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineralData } from '../../interfaces/mineral-data';
// servicios
import { TranslateModule } from '@ngx-translate/core';
import { MineralRepositoryService } from '../../services/mineral-repository';
import { Subscription } from 'rxjs';
import { UnitSystemService } from '../../services/unit-system';

@Component({
  selector: 'app-mineral-storage',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './mineral-storage.html',
  styleUrl: './mineral-storage.css',
})
export class MineralStorage implements OnInit, OnDestroy {
  minerals: MineralData[] = [];

  private mineralsSuscription: Subscription | undefined;

  constructor(
    private readonly mineralRepositoryService: MineralRepositoryService,
    public readonly unitSystemService: UnitSystemService,
  ) { }

  ngOnInit(): void {
    this.mineralsSuscription = this.mineralRepositoryService.minerals$.subscribe(
      minerals => this.minerals = minerals
    );
  } // ngOnInit.end

  ngOnDestroy(): void {
    if (this.mineralsSuscription) {
      this.mineralsSuscription.unsubscribe();
    }
  } // ngOnDestroy.end
}
