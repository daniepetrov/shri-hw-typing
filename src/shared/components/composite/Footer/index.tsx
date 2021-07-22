import { Container } from '@/shared/components/ui'
import data from './data'
import s from './Footer.module.scss'

function Footer() {
  return (
    <footer data-testid='footer' className={s.root}>
      <Container>
        <ul className={s.list}>
          {data.links.map((item) => (
            <li key={item.id} className={s.item}>
              <a className={s.link} href={item.href}>
                {item.name}
              </a>
            </li>
          ))}
          <li key="copyright" className={s.item}>
            <span className={s.copyright}>{data.copyright.text}</span>
          </li>
        </ul>
      </Container>
    </footer>
  )
}

export default Footer
