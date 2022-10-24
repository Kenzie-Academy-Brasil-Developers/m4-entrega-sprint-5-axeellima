import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Address {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  zipCode: string;

  @Column()
  number: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  @Column()
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
