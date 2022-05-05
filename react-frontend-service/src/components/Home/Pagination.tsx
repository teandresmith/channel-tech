import React from 'react'

type PaginationProps = {
  count: number
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ count, activeStep, setActiveStep }: PaginationProps) => {
  const styles = {
    pagination: {
      borderRadius: '50%',
      backgroundColor: 'black',
      height: '10px',
      width: '10px',
      marginLeft: '5px',
      cursor: 'pointer',
    },
    active: { backgroundColor: 'purple' },
  }

  const list = (count: number, activeStep: number) => {
    const listValues = []
    for (var i = 0; i < count; i++) {
      listValues.push(i)
    }
    return (
      <div style={{ display: 'flex' }}>
        {listValues.map((value) => (
          <div
            key={value}
            onClick={() => setActiveStep(value)}
            style={
              value === activeStep
                ? Object.assign({}, styles.pagination, styles.active)
                : Object.assign({}, styles.pagination)
            }
          ></div>
        ))}
      </div>
    )
  }
  return <>{list(count, activeStep)}</>
}

export default Pagination
