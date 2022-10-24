import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Address {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  @Column()
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
