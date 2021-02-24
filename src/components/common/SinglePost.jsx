import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, ClickAwayListener, Grid, IconButton, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcone from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import CommentIcon from '@material-ui/icons/Comment'
import SendIcon from '@material-ui/icons/Send'
import { SingleComment } from './SingleComment'
import Axios from "axios";
import { domain, header } from '../../env'
import { useStateValue } from '../../state/stateProvider'
import { useHistory } from 'react-router-dom'

const styles = makeStyles({
  mbtn: {
    position: 'relative',
    marginLeft: '30px'
  },
  items: {
    position: 'absolute',
    zIndex: '999'
  }
})

const SinglePost = ({ post, details = false  }) => {
    const [showComment, setShowComment] = useState(false);
    const [title, setTitle] = useState('');
    const [menu, setMenu] = useState(false);
    const [{ }, dispatch] = useStateValue()
    const classes = styles();
    const history = useHistory();
    const addlike  = () => {
        Axios({
          url: `${domain}/api/addlike/`,
          method: 'POST',
          headers: header,
          data: {
            id: post?.id,
          }
        }).then(response => {
            let data = response.data
            if (data['error'] === false) {
              dispatch({
                type: 'RELOAD',
                value: response.data,
              })
            }
          }).catch(error => {
            console.log(error);
          })
      }

      const addComment = () => {
        Axios({
          url: `${domain}/api/addcomment/`,
          method: 'POST',
          headers: header,
          data: {
            id: post?.id,
            title: title
          }
        }).then(response => {
          let data = response.data
          console.log(data);
          if (data['error'] === false) {
            dispatch({
              type: 'RELOAD',
              value: response.data,
            })
            setTitle('')
          }
        }).catch(error => {
          console.log(error);
        })
      }
      const godetails = () => {
        history.push(`/post/${post?.id}`)
      }
    return (
        <Card style={{margin:'10px 0px'}}>
            <CardHeader
                avatar={<Avatar src={post?.profile?.image} />}
                title={post?.profile?.user?.username}
                subheader={post?.created_at}
                action={
                  <>
                    <IconButton className={classes.mbtn} onClick={() => setMenu(!menu)}>
                      <MoreVertIcon />
                    </IconButton>
                    {
                      menu &&
                      <ClickAwayListener onClickAway={() => setMenu(false)} >
        
                        <Card className={classes.items} >
                          <MenuItem>Profile</MenuItem>
                          <MenuItem>Edit</MenuItem>
                          <MenuItem>Delate</MenuItem>
                        </Card>
                      </ClickAwayListener>
                    }
                  </>
                }
               
            />
            <CardContent>
                <CardActionArea onClick={godetails}>
                <Typography variant="h5">
                {post?.title}
            </Typography>
                </CardActionArea>
            <CardActionArea onClick={godetails}>
            <CardMedia 
                style={{height:0, paddingTop:"50%"}}
                image={post?.image}
            />
            </CardActionArea>
            <CardActionArea onClick={godetails}>
            {
            details ?
              <Typography>
                {post?.content}
              </Typography> :
              <Typography>
                {post?.content?.length > 100
                  ? post?.content?.substring(0, 100)
                  : post?.content}
              </Typography>
          }
            </CardActionArea>
            </CardContent>
            <Grid container>
                <Grid container justify="space-around" style={{ marginBottom: "5px" }}>
                    <Button  onClick={addlike} variant="contained" color="primary" startIcon={post?.like ? <FavoriteIcone color="secondary"/>:<FavoriteBorderIcon color="secondary"/>}>
                        Like({post?.liketotal})
                    </Button>
                    <Button 
                        onClick={() => setShowComment(!showComment)}
                        variant="contained"
                        startIcon={<CommentIcon />}
                    >
                        Comment({post?.comment.length})
                    </Button>
                </Grid>
                {showComment && (
                    <Grid container>
                    <TextField 
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        style={{ width: "100%" }}
                        label="Comment"
                        variant="filled"
                        InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={addComment}
                                disabled={title?.length <= 0 ? true : false}
                                color="primary">
                                <SendIcon />
                              </IconButton>
                            ),
                          }}
                    /> 
                </Grid>
                )}
                {
                    post?.comment?.map((item ,i)=><SingleComment key={i} comment={item} />)
                }
                
            </Grid>
              
        </Card>
        
    )
}

export default SinglePost
