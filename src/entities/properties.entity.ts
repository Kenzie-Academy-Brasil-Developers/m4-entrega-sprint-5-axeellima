import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
  ManyToOne,
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

  @Column("decimal", { nullable: false })
  value: number;

  @Column("integer", { nullable: false })
  size: number;

  @Column("date", { nullable: false })
  createdAt: string;

  @Column("date", { nullable: false })
  updatedAt: string;

  @OneToOne((type) => Address, (address) => address.id, {
    nullable: false,
  })
  @JoinColumn()
  address: Address;

  @OneToMany((type) => Schedule, (schedule) => schedule.property, {
    eager: true,
  })
  @JoinTable()
  schedules: Schedule[];

  @ManyToOne((type) => Categories, (category) => category.properties)
  @JoinColumn({ name: "category" })
  category: Categories;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.createdAt) {
      const newDate = new Date().toDateString();
      this.createdAt = newDate;
    }
    if (!this.updatedAt) {
      const newDate = new Date().toDateString();
      this.updatedAt = newDate;
    }
  }
}
