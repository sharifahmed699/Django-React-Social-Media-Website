import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    TextField,
    Typography,
  } from "@material-ui/core";
  import React, { useState } from "react";
  import SendIcon from "@material-ui/icons/Send";
  import SingleReply from "./SingleReply";
  import { useStateValue } from "../../state/stateProvider";
  import Axios from "axios";
  import { domain, header } from '../../env'
  
  export const SingleComment = ({ comment }) => {
    const [showReply, setShowReply] = useState(false);
    const [{ }, dispatch] = useStateValue()
    const [title, setTitle] = useState('')

    const addReply = () => {
        Axios({
          url: `${domain}/api/addreply/`,
          method: 'POST',
          data: {
            cid: comment?.id,
            rtext: title
          }
          ,
          headers: header
        }).then(response => {
          let data = response.data
          if (data['error'] === false) {
            dispatch({
              type: 'RELOAD',
              value: data
            })
            setTitle('')
          }
        }).catch(error => {
          console.log(error);
        })
      }
    
    return (
      <Card>
        <CardHeader
          title={comment?.profile?.user?.username}
          subheader={comment?.created_at}
          avatar={<Avatar src={comment?.profile?.image} />}
        />
        <CardContent>
          <Typography>{comment?.title}</Typography>
          <Button onClick={() => setShowReply(!showReply)}>
            Reply({comment?.reply.length})
          </Button>
        </CardContent>
        {showReply && (
          <Grid style={{ marginLeft: "40px" }} container diraction="column">
            <TextField
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              style={{ width: "70%" }}
              label="Reply"
              variant="filled"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={addReply}
                    disabled={title?.length <= 0 ? true : false}
                    color="primary">
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
            <Grid container diraction="column">
              {comment?.reply?.map((item, i) => (
                <SingleReply key={i} reply={item} />
              ))}
            </Grid>
          </Grid>
        )}
      </Card>
    );
  };
