import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  
cancel() {
  this.action='list';
}

  http = inject(HttpClient);
  data: any[] = [];
  action='list';
  entity={
    title:'',
    writer:'',
    price:0
  };
  ngOnInit(): void {
    this.refersh();
    console.log('books init');
   

  }
  refersh(){
    this.http.get('http://localhost:5187/books/list').subscribe(res => {
      this.data = res as any[];
    }); 
  }
  addClick() {
    this.action='add';
  }
  ok() {
    if (this.action=='add'){
      this.http.post('http://localhost:5187/books/add',this.entity).subscribe(res=>{
        this.action='list';
        this.refersh();
      });
    }
  }
  editClick(item: any) {
    this.action='edit';
    this.entity=item;
    }
}