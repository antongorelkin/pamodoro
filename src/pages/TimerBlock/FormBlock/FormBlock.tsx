import { Form } from "./Form/Form";
import { TimeCounter } from "./Form/TimeCounter/TimeCounter";
import { Instruction } from "./Instruction/Instruction";
import styles from './formblock.module.css'

export function FormBlock() {
  return (
    <div className={styles.formContainer}>
      <Instruction />
      <Form />
      <TimeCounter />
    </div>
  )
}