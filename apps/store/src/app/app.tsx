/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {Game} from '@nxegghead/api/util-interfaces'
import { Header } from '@nxegghead/store/ui-shared'
import { formatRating } from '@nxegghead/store/util-formatters'
import { StoreFeatureGameDetail } from '@nxegghead/store/feature-game-detail';

import './app.css';

const App = () => {
  const history = useHistory();
  const [state, setState] = useState<{
    data: Game[];
    loadingState: 'success' | 'error' | 'loading'
  }>({
    data: [],
    loadingState: 'success'
  })

  useEffect(() => {
    setState((s) => ({
      ...s,
      loadingState: 'loading'
    }))
    fetch('/api/games')
      .then((x) => x.json())
      .then((response) => {
        setState((s) => ({
          ...s,
          data: response,
          loadingState: 'success'
        }))
      })
      .catch((err) => {
        setState((s) => ({
          ...s,
          loadingState: 'error'
        }))
      })
  }, [])

  return (
    <>
      <Header title="Board Game Hoard" />
      <div className="container" data-testid="app-container">
        <div className="games-layout">
          {state.loadingState === 'loading'
            ? 'Loading ...'
            : state.loadingState === 'error'
            ? (
              <div>Error retrieving data</div>
            ) 
            : (state.data.map((x) => (
            <Card key={x.id} className="game-card" onClick={() => history.push(`/game/${x.id}`)}>
              <CardActionArea>
                <CardMedia
                  className="game-card-media"
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="game-rating"
                  >
                    <strong>Rating:</strong> {formatRating(x.rating)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )))}
        </div>
      </div>
      <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </>
  )
};

export default App;
