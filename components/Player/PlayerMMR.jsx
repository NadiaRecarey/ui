import React from 'react';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';
import FontIcon from 'material-ui/FontIcon';

export const PlayerMMR = ({ loading, error, rank, soloRank, mmrEstimate }) => {
  const getPlayerMMR = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div>
        <span>
          <span>
            <abbr title={"Solo MMR"}>
              <FontIcon className="material-icons">
                person
              </FontIcon>
            </abbr>
          </span>
          <small>{soloRank}</small>
        </span>
        <span>
          <span>
            <abbr title={"Party MMR"}>
              <FontIcon className="material-icons">
                group
              </FontIcon>            </abbr>
          </span>
          <small>{rank}</small>
        </span>
        <span>
          <span>
            <abbr title={"MMR estimate based on available data from peer players. This is an estimate of the population mean MMR of the recent matches played by this user."}>
              <FontIcon className="material-icons">
                help
              </FontIcon>            
            </abbr>
          </span>
          <small>{mmrEstimate.estimate}</small>
        </span>
      </div>
    );
  };

  return (
    <div className={styles.mmrContainer}>
      {getPlayerMMR()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  rank: player.getCompetitiveRank(state, ownProps.playerId),
  soloRank: player.getSoloMmrEstimate(state, ownProps.playerId),
  mmrEstimate: player.getMmrEstimate(state, ownProps.playerId),
});


export default connect(mapStateToProps)(PlayerMMR);
