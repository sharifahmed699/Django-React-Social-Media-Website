import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, TextField, Typography } from '@material-ui/core'
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

const SinglePost = ({ post }) => {
    const [showComment, setShowComment] = useState(false);
    const [title, setTitle] = useState('');
    const [{ }, dispatch] = useStateValue()
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
    return (
        <Card style={{margin:'10px 0px'}}>
            <CardHeader
                avatar={<Avatar src={post?.profile?.image} />}
                title={post?.profile?.user?.username}
                subheader={post?.created_at}
                action={
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                }
               
            />
            <CardContent>
                <CardActionArea>
                <Typography variant="h5">
                {post?.title}
            </Typography>
                </CardActionArea>
            <CardActionArea>
            <CardMedia 
                style={{height:0, paddingTop:"50%"}}
                image={post?.image}
            />
            </CardActionArea>
            <CardActionArea>
                <Typography>
                    {
                        post?.content?.length > 100
                        ? post?.content?.substring(0,100)
                        :post?.content
                    }
                </Typography>
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
