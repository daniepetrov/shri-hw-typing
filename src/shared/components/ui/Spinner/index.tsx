import s from './Spinner.module.scss'

export default function Spinner(): JSX.Element {
  return <div data-testid="spinner" className={s.root}></div>
}
