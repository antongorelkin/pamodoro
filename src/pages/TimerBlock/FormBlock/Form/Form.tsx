import { useDispatch } from 'react-redux';
import styles from './form.module.css';
import { addTask } from '../../../../store/slice/todosSlice';
import { Menu } from '../TaskList/Menu/Menu';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { FormEvent, useState } from 'react';
import { generateId } from '../../../../utils/generateId';
import { TaskList } from '../TaskList/TaskList';

export function Form() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const newTask = {
    id: generateId(),
    title: value,
    count: 1,
    task_fihished: 0,
    edit: false,
  };


  function handleChange(event: any) {
    setValue(event.target.value)
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  };

  const addNewTask = () => {
    if (value !== '') {
      dispatch(addTask(newTask));
    }
    setValue('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder='Название задачи'
        value={value}
        title='title'
        onChange={handleChange}>

      </input>
      <button type='submit' className={styles.formBtn} onClick={addNewTask}>
        Добавить
      </button>
      <TaskList />
    </form>
  )
}