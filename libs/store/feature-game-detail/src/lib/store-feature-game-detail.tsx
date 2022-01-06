import { useEffect, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import './store-feature-game-detail.css'

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { formatRating } from '@nxegghead/store/util-formatters'
import {Game} from '@nxegghead/api/util-interfaces'

type TParams = {
  id: string;
}

export interface StoreFeatureGameDetailProps extends RouteComponentProps<TParams> {
  match: any;
}

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
  const [state, setState] = useState<{
    data: any;
    loadingState: 'success' | 'error' | 'loading'
  }>({
    data: {},
    loadingState: 'success'
  })

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading'
    })
    const gameId = props.match.params.id
    fetch(`/api/games/${gameId}`)
      .then((x) => x.json())
      .then((response) => {
        setState({
          ...state,
          data: response,
          loadingState: 'success'
        })
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error'
        })
      })
  }, [props.match.params.id])

  return (
    <div className="container">
      {state.loadingState === 'loading' ? (
        'Loading...'
      ) : state.loadingState === 'error' ? (
        <div>Error fetching data</div>
      ) : state.data && (
        <Card>
          <CardActionArea>
            <CardMedia
              className="game-card-media"
              image={state.data.image}
              title={state.data.name}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {state.data.name}
              </Typography>
              <Typography
                component="p"
                variant="body2"
                color="textSecondary"
                className="game-rating"
              >
                <strong>Rating:</strong> {formatRating(state.data.rating)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  )
}