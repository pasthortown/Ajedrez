import { Piece } from "./../../models/negocio/Piece";
import { Board } from "./../../models/negocio/Board";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  @ViewChild("pawnPromotionModalDialog") pawnPromotionModalDialog;
  board: Board;
  fromCords = "";
  toCords = "";
  activate = false;
  blackClock = "clock";
  whiteClock = "clock-moving";
  minutsWhites: number;
  secondsWhites: number;
  minutsBlacks: number;
  secondsBlacks: number;
  backupBoard: any[];
  piecesPromote: Piece[] = [
    new Piece("br", 4),
    new Piece("bh", 4),
    new Piece("bb", 4),
    new Piece("bq", 4)
  ];
  columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
  rows = {
    0: 8,
    1: 7,
    2: 6,
    3: 5,
    4: 4,
    5: 3,
    6: 2,
    7: 1
  };

  constructor(private modalDialog: NgbModal) {
    this.board = new Board();
    this.minutsWhites = Math.floor(this.board.timeWhite / 60);
    this.secondsWhites =
      this.board.timeWhite - Math.floor(this.board.timeWhite / 60) * 60;
    this.minutsBlacks = Math.floor(this.board.timeBlack / 60);
    this.secondsBlacks =
      this.board.timeBlack - Math.floor(this.board.timeBlack / 60) * 60;
    this.backupBoard = [];
  }

  ngOnInit() {}

  reloj() {
    if (this.board.turnToMove === "black") {
      this.board.timeBlack = this.board.timeBlack - 1;
    }
    if (this.board.turnToMove === "white") {
      this.board.timeWhite = this.board.timeWhite - 1;
    }
    this.minutsWhites = Math.floor(this.board.timeWhite / 60);
    this.secondsWhites =
      this.board.timeWhite - Math.floor(this.board.timeWhite / 60) * 60;
    this.minutsBlacks = Math.floor(this.board.timeBlack / 60);
    this.secondsBlacks =
      this.board.timeBlack - Math.floor(this.board.timeBlack / 60) * 60;
    if (this.activate) {
      setTimeout(() => {
        this.reloj();
      }, 1000);
    }
  }

  movement() {
    const result = this.board.move(this.fromCords, this.toCords);
    if (this.board.turnToMove === "black") {
      this.blackClock = "clock-moving";
      this.whiteClock = "clock";
      if (!this.activate) {
        this.activate = true;
        this.reloj();
      }
    } else {
      this.blackClock = "clock";
      this.whiteClock = "clock-moving";
      if (!this.activate) {
        this.activate = true;
        this.reloj();
      }
    }
    if (result.promoter === "white" || result.promoter === "black") {
      this.promoted(this.toCords, result.promoter);
    }
    this.fromCords = "";
    this.toCords = "";
  }

  cordsClick(row, column) {
    if (this.fromCords === "") {
      this.fromCords = this.columns[column] + this.rows[row];
      this.backupBoard = this.board.getCurrentPosition();
      this.board.checkPosibilities(row, column);
    } else {
      if (
        this.board.pieces[row][column].color === "shadow" ||
        this.board.pieces[row][column].color === "capture"
      ) {
        this.toCords = this.columns[column] + this.rows[row];
        this.board.drawBoard(this.backupBoard);
        this.movement();
      } else {
        this.board.drawBoard(this.backupBoard);
        this.fromCords = this.columns[column] + this.rows[row];
        this.backupBoard = this.board.getCurrentPosition();
        this.board.checkPosibilities(row, column);
      }
    }
  }

  promoted(cords: string, color: string) {
    this.piecesPromote.forEach(piece => {
      piece.set(piece.name, color);
    });
    this.modalDialog
      .open(this.pawnPromotionModalDialog, { centered: true })
      .result.then(
        result => {
          if (result === "cancel") {
            if (color === "white") {
              this.board.setPawnPromotion(cords, "wq");
            }
            if (color === "black") {
              this.board.setPawnPromotion(cords, "bq");
            }
          } else {
            this.board.setPawnPromotion(cords, result);
          }
        },
        result => {
          if (color === "white") {
            this.board.setPawnPromotion(cords, "wq");
          }
          if (color === "black") {
            this.board.setPawnPromotion(cords, "bq");
          }
        }
      );
  }
}
