import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity()
export class Schedule {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("date", { nullable: true })
  date: string;

  @Column("time", { nullable: true })
  hour: string;

  @ManyToOne((type) => Properties, (properties) => properties.schedules, {
    nullable: true,
  })
  @JoinColumn()
  property: Properties["id"];

  @ManyToOne((type) => User, (user) => user.id, { nullable: true })
  @JoinColumn()
  user: User["id"];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
