// paginator.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  public itemsPerPage = 4; 
  public currentPage = 1;
  private data!: any[];

  setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
  }

  setData(data: any[]): void {
    this.data = data;
    console.log(data)
  }

  paginate(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  get totalPages(): Promise<number>{
    return new Promise<number>((resolve, reject) => {
        try {
            const num=Math.ceil(this.data.length / this.itemsPerPage);
            resolve(num)
        } catch (error) {
            reject(error);
        }
    })
    
  }
}
