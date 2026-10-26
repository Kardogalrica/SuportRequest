const IF = ({ Condition = false,
              True = null,
              False = null
            }) => {

  return (
    <>
      {Condition ? True : False}
    </>
  )
}

export default IF