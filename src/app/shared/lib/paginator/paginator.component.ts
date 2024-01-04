import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PaginatorService } from '../../services/pagination.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterViewInit {
  totalPages!: number;
  currentPage!: number;
  pageNumbers!: number[] 


  constructor(private paginatorService: PaginatorService) {}

  async ngAfterViewInit() {
   
    this.totalPages = await this.paginatorService.totalPages;
    console.log(this.totalPages)
    this.currentPage = this.paginatorService.currentPage;
    this.addNum()
  }
  addNum(){
    this.pageNumbers=[]
    for(let i=1;i<=this.totalPages;i++){
      this.pageNumbers.push(i)
    }
  }
  

  setPage(page: number): void {
    this.currentPage = page;
    this.paginatorService.setCurrentPage(page);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
      console.log(this.currentPage)
    }
  }
}
