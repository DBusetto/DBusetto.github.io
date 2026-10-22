import { Outlet } from 'react-router'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import ScrollManager from '../ScrollManager/ScrollManager'
import styles from './Layout.module.scss'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.column}>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollManager />
    </div>
  )
}
