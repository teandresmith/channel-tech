import React from 'react'
import {
  Stack,
  Box,
  Grid,
  Typography,
  Rating,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
} from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { MHFTextField, MHFRating } from 'mui-hook-form-mhf'
import { useCreateReviewMutation } from '../../redux/services/productAPI'
import { Product } from '../../redux/types/Types'

type ReviewsProp = {
  data: Product
}

type FormData = {
  name: string
  rating: string
  comment: string
}

const Reviews = ({ data }: ReviewsProp) => {
  const methods = useForm<FormData>()

  const [openModal, setOpenModal] = React.useState(false)

  const [createReview] = useCreateReviewMutation()

  const onSubmit = (info: FormData) => {
    const review = {
      name: info.name,
      rating: parseFloat(info.rating),
      comment: info.comment,
    }

    const productId = data.productId
    createReview({ review, productId })

    setOpenModal(false)
    methods.setValue('name', 'Anon')
    methods.setValue('rating', '5')
    methods.setValue('comment', '')
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const averageRating = () => {
    if (data.reviews === null || data.reviews.length === 0) {
      return (0).toFixed(2)
    }

    return (
      data.reviews.reduce(
        (previousValue, currentValue) => previousValue + currentValue.rating,
        0
      ) / data.reviews.length
    ).toFixed(2)
  }

  return (
    <>
      <Stack direction='column' spacing={1} sx={{ pt: 8, pb: 4 }}>
        <Box component='div'>
          <Typography variant='h4'>Customer Reviews</Typography>
        </Box>
        <Box
          component='div'
          sx={{ backgroundColor: 'lavender', borderRadius: 3, pt: 3, pb: 3 }}
        >
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box component='div'>
                <Typography variant='h5' sx={{ pl: 2 }}>
                  Average Rating
                </Typography>
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pt: { xs: 1, sm: 2 },
                  }}
                >
                  <Rating
                    value={parseFloat(averageRating())}
                    readOnly
                    precision={0.5}
                    sx={{
                      pl: 2,
                    }}
                  />
                  <Typography variant='h6' sx={{ ml: 1 }}>
                    ({averageRating()})
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ pt: { xs: 2, sm: 0 } }}>
              <Box component='div'>
                <Typography variant='h6' sx={{ pb: 1, pl: { xs: 2, sm: 0 } }}>
                  Want to review this product?
                </Typography>
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    ml: { xs: 2, sm: 0 },
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  Write Review
                </Button>
                <Dialog open={openModal} onClose={handleClose}>
                  <DialogTitle>Review</DialogTitle>
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                      <DialogContent>
                        <DialogContentText>
                          We appreciate your time to write a review. This allows
                          us and other customers to understand the quality of
                          service and goods provided.
                        </DialogContentText>
                        <MHFTextField
                          defaultValue='Anon'
                          name='name'
                          control={methods.control}
                          autoFocus
                          margin='dense'
                          label='Name'
                          id='name'
                          fullWidth
                          variant='outlined'
                          required
                          color='secondary'
                        />

                        <MHFRating name='rating' control={methods.control} />
                        <MHFTextField
                          defaultValue=''
                          name='comment'
                          control={methods.control}
                          margin='dense'
                          label='Comment'
                          id='comment'
                          fullWidth
                          variant='outlined'
                          required
                          multiline
                          color='secondary'
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' color='inherit'>
                          Submit
                        </Button>
                      </DialogActions>
                    </form>
                  </FormProvider>
                </Dialog>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box component='div' sx={{ pt: 3 }}>
          {data.reviews === null || data.reviews.length === 0 ? (
            <Typography variant='h6'>
              There are no reviews for this item yet...
            </Typography>
          ) : (
            <Grid container rowGap={4}>
              {data.reviews.map((review) => (
                <Grid item xs={12} key={review.reviewId}>
                  <Grid container sx={{ pt: 1, pb: 1 }}>
                    <Grid item xs={2}>
                      <Avatar>{review.name[0]}</Avatar>
                    </Grid>
                    <Grid item xs={10}>
                      <Box component='div'>
                        <Rating
                          value={review.rating}
                          readOnly
                          precision={0.5}
                        />
                        <Typography variant='body1'>
                          {review.comment}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Stack>
    </>
  )
}

export default Reviews
