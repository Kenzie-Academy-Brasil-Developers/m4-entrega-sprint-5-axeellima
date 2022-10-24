import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Categories {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
