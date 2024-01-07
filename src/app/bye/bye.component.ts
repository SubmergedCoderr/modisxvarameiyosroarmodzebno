import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-bye',
  templateUrl: './bye.component.html',
  styleUrls: ['./bye.component.scss']
})
export class ByeComponent {

  cislajvardebistvis: string = '';

  sendMail() {
    console.log(this.cislajvardebistvis);
    
    const params = {
      from_name: "ანაკოკო",
      email_id: "miy@miy.com",
      message: this.cislajvardebistvis,
    };

    if( this.cislajvardebistvis.length == 0){
      alert('ცარიელ ფურცელს უგზავნი ცის ლაჟვარდებს ? ეჰხსთ');
    }

    emailjs.send('service_3l6qdff', 'template_7vtjsru', params, 'w7HKi1oNq0p4FpjVp')
      .then((res) => {
        console.log('Email sent successfully:', res);
        alert('გავალ გარეთ იქნებ ქარმა მაინც მომართვას ეგ ფურცელი.\n \n პ.ს ერთ-ერთი სიმღერა ბოლომდე ჩამოსასქროლი შეიძლება დაგრჩენოდა \n \n კოდი: 88888888(ამას ჯერ ვერ მიხვები, იმედია არც მოგიწევს მიხვედრა)');

      })
      .catch((error) => {
        console.error('Failed to send email. Error:', error);
        alert('ცის ლაჟვარდებისგან უარყოფილია რაღაც მიზეზით ;//');
      });
  }

}
