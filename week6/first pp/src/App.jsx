// import { useState } from "react"


// function App() {
//   const [firstTitle, setFirstTitle]  = useState("my name is sk");

//   function changeTitle() {
//     setFirstTitle("My name is " + Math.random());
//   }

//   return (
//     <>
//     <button onClick={changeTitle}>cluck me to change title</button>
//     <Header title = {firstTitle} />
//     <Header title="My name is raman" />
//     </>
//   )
// }

// function Header({title}) {
//   return <div>
//     {title}
//   </div>
// }

// export default App


// more optimised less re-rendering
// import { useState } from "react"

// function App() {
//   return (
//     <div>
//       <HeaderWithButton />
//       <Header title="My name is raman" />
//     </div>
//   )
// }

// function HeaderWithButton() {
//   const [firstTitle, setFirstTitle] = useState("my name is harkirat");

//   function changeTitle() {
//     setFirstTitle("My name is " + Math.random())
//   }

//   return <>
//     <button onClick={changeTitle}>Click me to change the title</button>
//     <Header title={firstTitle} />
//   </>
// }

// function Header({title}) {
//   return <div>
//     {title}
//   </div>
// }

// export default App


// more optimised with memo 

import { useState } from "react"
import { memo } from 'react';

function App() {
  const [firstTitle, setFirstTitle] = useState("my name is harkirat");

  function changeTitle() {
    setFirstTitle("My name is " + Math.random())
  }

  return (
    <div>
      <button onClick={changeTitle}>Click me to change the title</button>
      <Header title={firstTitle} />
      <br />
      <Header title="My name is raman" />
      <Header title="My name is raman" />
      <Header title="My name is raman" />
      <Header title="My name is raman" />
    </div>
  )
}

const Header = memo(function ({title}) {
  return <div>
    {title}
  </div>
})

export default App