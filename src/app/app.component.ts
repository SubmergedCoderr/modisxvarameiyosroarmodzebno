import { Component, OnInit, ViewChild  } from '@angular/core';
import { Music } from './music';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { PopIpComponent } from './pop-ip/pop-ip.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {
  title = 'sounds';
  audio = new Audio();
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  percentage: number = 0;
  percentageVolume: number = 0;

  isHovered: boolean = false;
  isHoveredVolume: boolean = false;
  showMusicsComponent: boolean = true;
  showBye: boolean = true;
  showGandzi :  boolean = true;

  @ViewChild('volumeInput') volumeInput: any;
  


  onMouseOver(): void {
    this.isHovered = true;
  }

  onMouseOut(): void {
    this.isHovered = false;
  }

  onMouseOverVolume(): void {
    this.isHoveredVolume = true;
  }

  onMouseOutVolume(): void {
    this.isHoveredVolume = false;
  }

  mute(){
    if (this.audio.volume === 0){
      this.audio.volume = 1;
      this.volumeInput.nativeElement.value = 1;
    }else{
      this.audio.volume = 0;
      this.volumeInput.nativeElement.value = 0;
    }
  }

  getRangeBackground(){
    this.percentage = (this.audio.currentTime / this.duration) * 100;
    return `linear-gradient(to right, white ${this.percentage}%, grey ${this.percentage}% 100%)`;
  }

  getHoverBackground() {
    this.percentage = (this.audio.currentTime / this.duration) * 100;
    return `linear-gradient(to right, #1ed760 ${this.percentage}%, grey ${this.percentage}% 100%)`;
  }

  setBackgroundVolume(){
    this.percentageVolume = this.audio.volume * 100
    if(this.isHoveredVolume == true){
      return `linear-gradient(to right, #1ed760 ${this.percentageVolume}%, grey ${this.percentageVolume}% 100%)`;
    }else{
      return `linear-gradient(to right, white ${this.percentageVolume}%, grey ${this.percentageVolume}% 100%)`;
    }
  }

  // getRangeBackgroundVolume(){
  //   this.percentageVolume = (this.audio.currentTime / this.duration) * 100;
  //   return `linear-gradient(to right, white ${this.percentageVolume}%, grey ${this.percentageVolume}% 100%)`;
  // }

  // getHoverBackgroundVolume() {
  //   this.percentageVolume = (this.audio.volume / this.duration) * 100;
  //   return `linear-gradient(to right, #1ed760 ${this.percentage}%, grey ${this.percentageVolume}% 100%)`;
  // }
  
  show : boolean = false;
  openDialog() {
    const dialogRef = this.dialogRef.open(PopIpComponent, {
      data: {
        musicList: this.musicList
      }
    });
  
    dialogRef.afterClosed().subscribe((infoFromDialog: number) => {
      if(infoFromDialog !== undefined){
        console.log(infoFromDialog);
        
        this.play(infoFromDialog)
      }

  
    });
  }
  constructor(private dialogRef : MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration),
            duration = moment.duration(totalSeconds, 'seconds');
      this.musicLength = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
      this.duration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      this.currentTime = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
    }
  }
  ngOnInit() {
    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
  
      this.showMusicsComponent = !this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('anakoko');
      this.showBye = !this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('bye');
      this.showGandzi = !this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.includes('chemigandzi');
    });
  }

  musicList: Music[] = [
    {
      album: "Discovery",
      title: "Something About Us",
      artist: "Daft Punk",
      url: "/assets/Daft Punk - Something About Us (Official Video).mp3",
      image: "/assets/images/sau.jpg",
      coverImage: "/assets/images/saucover.png",
      albumImage: "/assets/images/albums/dpalbum.png",
      gradient: 'linear-gradient(135deg, #000000  10%, rgb(249, 119, 148)  74%)',
      lyrics: "It might not be the right time <br> I might not be the right one <br> But there's something about us I want to say <br> 'Cause there's something between us anyway "
    },
    {
      album: "Dark Was The Night(Red Hot Compilation)",
      title: "Train Song",
      artist: "Feist, Benjamin Gibbard",
      url: "/assets/_Train Song_ by Feist & Ben Gibbard.mp3",
      image: "/assets/images/ts.png",
      coverImage: "/assets/images/tscover.jpg",
      albumImage: "/assets/images/ts.png",
      gradient: 'linear-gradient(112deg, #05060a  10%, #473946 74%)',
      lyrics: "Traveling north, traveling north to find you <br> Train wheels beating, the wind in my eyes <br>Don't even know what I'll say when I find yoy <br> Call out your name, love, don't be surprised "
    },
    {
      album: "Everything You've Come To Expect(Deluxe Edition)",
      title: "Sweet Dreams, TN",
      artist: "The Last Shadow Puppets",
      url: "/assets/Sweet Dreams, TN.mp3",
      image: "/assets/images/sd.png",
      coverImage: "/assets/images/sdcover.jpg",
      albumImage: "/assets/images/sd.png",
      gradient: "linear-gradient(125deg, #181107 0%, #d2a813  100%)",
      lyrics: "I just sort of always feel sick without you baby <br> I ain't got anything to lick without you, baby <br> Nothing seems to stick without you, baby <br> Ain't I fallen in love ? "
    },

    {
      album: "The Age Of The Understatement",
      title: "The Meeting Place",
      artist: "The Last Shadow Puppets",
      url: "/assets/The Meeting Place.mp3",
      image: "/assets/images/tmp.jpg",
      coverImage: "/assets/images/iffff.jpg",
      albumImage: "/assets/images/tmp.jpg",
      gradient: 'linear-gradient(147deg, #000000  0%, #4d4855 74%)',
      lyrics: "The colder the night gets, the further she strays <br> And he doesn't like it being this way <br> And she tried so hard to steer away from the meeting place <br> But her heart had led her there"
    },

    {
      album: "The Archer",
      title: "Can't Help Myself",
      artist: "Alexandra Savior",
      url: "/assets/Alexandra Savior - Can't Help Myself.mp3",
      image: "/assets/images/chm.jpg",
      coverImage: "/assets/images/hug.png",
      albumImage: "/assets/images/chm.jpg",
      gradient: 'linear-gradient(135deg, rgb(18, 16, 14) 0%, rgb(35, 44, 58) 74%)',
      lyrics: "Soft kiss, my baby wanted it <br> I could sense it from a mile away <br> He wants a bit of this sweet melancholy and <br> He can get it any time of day "
    },

    {
      album: "One Breath (Deluxe Edition)",
      title: "Strange Weather",
      artist: "Anna Calvi, David Byrne",
      url: "/assets/Anna Calvi, David Byrne - Strange Weather (Official Video).mp3",
      image: "/assets/images/sw.jpeg",
      coverImage: "/assets/images/swcover.png",
      albumImage: "/assets/images/sw.jpeg",
      gradient: 'linear-gradient(115deg, #09141a  0%,#143260  74%)',
      lyrics: "She'll take you back, don't make believe <br> You wanna think it through <br> I've loved before, I'll love again <br> I know that yours was true "
    },


  ]


  trackPointer: number = 0;
  currentMusic: Music = {
    album: "",
    title: "", 
    artist: "",
    url: "",
    image: "",
    coverImage: "",
    albumImage: "",
    gradient: '',
    lyrics: ''

  }

  play(index?: number): void {
    this.show = true;
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.currentMusic = this.musicList[0];
          this.audio.src = this.currentMusic.url;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[index];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    } 
  }

  prev(): void {
    console.log(this.trackPointer);
    
    if(this.trackPointer === 0){
      this.trackPointer = this.musicList.length;
    }
    this.trackPointer--;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  next(): void {
    if(this.trackPointer === this.musicList.length -1){
      this.trackPointer = -1;
    }
    this.trackPointer++;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

  volumeSlider(event: any) {
    console.log("lekso");
    console.log(event.target.value);
    
    this.audio.volume = event.target.value;

  }

  durationSlider(event: any) {
    this.audio.currentTime = event.target.value;
  }

  

}
