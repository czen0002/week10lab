import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  constructor(private dbService:DatabaseService) { }

  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
    this.onGetActorsMovies();
  }

  actorsDB: any[] = [];
  moviesDB: any[] = [];
  actors: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title: string = "";
  year: number = 0;
  movieId: string = "";

  // Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  // Get actors acting in at least 2 movies
  onGetActorsMovies() {
    this.dbService.getActorsMovies().subscribe((data: any[]) => {
      this.actors = data;
    })
  }
  // Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  // Create a new Movie, POST request
  onSaveMovie() {
    let obj = {title: this.title, year: this.year};
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  onSelectMovie(item){
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }

  // Update Movie
  onUpdataMovie(){
    let id = this.movieId;
    let obj = { name: this.fullName, bYear: this.bYear, id: this.actorId };
    this.dbService.updateMoive(id, obj).subscribe(result => {
      this.onGetMovies();
    })
  }

  // Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    })
  }

  onDeleteMovies() {
    let year = this.year;
    this.dbService.deleteMovies(year).subscribe(result => {
      this.onGetMovies();
    })
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
}
