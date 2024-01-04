import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { IActivity } from 'src/app/shared/models/activity.model';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PaginatorService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit, AfterViewInit {
  plannerReceiver: IActivity[] = [];
  @ViewChild('contentToExport', { static: false }) contentToExport!: ElementRef;

  constructor(private router: Router, public paginatorService:PaginatorService) {}
  displayedColumns: string[] = ['Date', 'Activity', 'Leaders', 'Synopsis'];

  ngOnInit(): void {
    const data = localStorage.getItem('planner');
    this.paginatorService.setItemsPerPage(6)
    if (data === null) {
      console.log('no data');
      this.router.navigate(['/dashboard/empty']);
    }

    const detail = localStorage.getItem('timetable');
    if (!detail) {
      this.plannerReceiver = [];
    }

    this.plannerReceiver = JSON.parse(detail as string) as IActivity[];
    this.updatePaginator(this.plannerReceiver)

  }
  ngAfterViewInit(): void {
  }
  receivePlanner(event: IActivity) {
    console.log(event);

    if (!this.plannerReceiver) {
      this.plannerReceiver = [];
    }
    this.plannerReceiver.push(event);
    console.table(this.plannerReceiver);
    localStorage.setItem('timetable', JSON.stringify(this.plannerReceiver));
    this.plannerReceiver;
  }
 updatePaginator(value: IActivity[]) {
    this.paginatorService.setData(value);
  }
  exportAsPDF() {
    const content = this.contentToExport.nativeElement;
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      let width = pdf.internal.pageSize.getWidth();
      let height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);

      pdf.save('exported-view.pdf');
    });
  }
}
