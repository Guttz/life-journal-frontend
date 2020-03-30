import SongsComponent from '../views/Timeline/Songs/Songs';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { RootState } from '../store/rootState';
import { SongsActionsTypes } from '../store/songs/songs.actions.types';
import { SongInterface } from '../store/songs/songs.interfaces';
import SongActions from '../store/songs/songs.actions';

const mapStateToProps = (state: RootState): any => {
  return {
    lastIndex: state.songs.lastIndex,
    songs: state.songs.songs,
  };
};

// Question - Best way to mapDipatchToProps, dispatch here or in view
const mapDispatchToProps = (dispatch: Dispatch<SongsActionsTypes>): any => ({
  insertSong: (song: SongInterface): any => dispatch(SongActions.InsertSong(song)),
  updateSong: (song: SongInterface): any => dispatch(SongActions.UpdateSong(song)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(SongsComponent);
