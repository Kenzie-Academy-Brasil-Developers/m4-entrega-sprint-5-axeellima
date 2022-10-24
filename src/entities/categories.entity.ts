import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";

@Entity()
export class Categories {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany((type) => Properties, (property) => property.category)
  properties: Properties[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
