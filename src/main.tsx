import { render } from 'preact'

import './index.css'
import {Gallery} from "./views/Gallery.tsx";

const Main = () => (
    <>
        <Gallery />
    </>
)

render(<Main />, document.getElementById('app')!)
