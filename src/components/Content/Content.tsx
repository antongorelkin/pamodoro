import styles from './content.module.css';


interface IContentProps {
  children: React.ReactNode;
}

export function Content({ children }: IContentProps) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  )
};