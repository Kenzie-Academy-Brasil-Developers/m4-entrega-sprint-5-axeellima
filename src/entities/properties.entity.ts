import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Schedule } from "./schedule.entity";

@Entity()
export class Properties {
  @PrimaryColumn("uuid")
  id: string;

  @Column("boolean", { default: false })
  sold: boolean;

  @Column("decimal", { nullable: true })
  value: number;

  @Column("int4", { nullable: true })
  size: number;

  @Column("date", { nullable: true })
  createdAt: string;

  @Column("date", { nullable: true })
  updatedAt: string;

  @OneToOne((type) => Address, (address) => address.id, { nullable: true })
  @JoinColumn()
  address: Address["id"];

  @OneToMany((type) => Schedule, (schedule) => schedule.property)
  @JoinTable()
  schedules: Schedule;

  @OneToOne((type) => Categories, (category) => category.id)
  @JoinColumn()
  category: Categories["id"];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.createdAt) {
      this.createdAt = Date();
    }
    if (!this.updatedAt) {
      this.updatedAt = Date();
    }
  }
}
