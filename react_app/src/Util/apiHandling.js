var BASE_URL = "http://localhost:8900/api/"
const RESSOURCE_URL = BASE_URL + "jsonapi/"


export function getItem(type, id, functionToKeepResults, functionToPreventSeveralAPICall) {
  if (type !== undefined && id !== undefined) {
    console.log("Parameters are set ! Type :" + type + "  Id :" + id);
    let url = RESSOURCE_URL + "/node/" + type + "/" + id
    functionToPreventSeveralAPICall()
    fetch(url
    ).then(result => result.json()
    ).then(result => result.data
    ).then(result => functionToKeepResults(result))
  } else {
    console.log("Undefined parameters ! Type :" + type + "  Id :" + id);
  }
}


export function extractData(jsonObjectData, functionToPreventSeveralCall, functionToKeepTheImageURL, ...contentILookFor) {
  let resultContainer = {};
  functionToPreventSeveralCall();
  for (let i = 0; i < contentILookFor.length; i++) {
    switch (contentILookFor[i]) {
      case 'id' :
        appendData(jsonObjectData.id, 'id', resultContainer)
        break;
      case 'type' :
        appendData(jsonObjectData.type, 'type', resultContainer)
        break;
      case 'titre' :
        appendData(jsonObjectData.attributes.title, 'titre', resultContainer)
        break;
      case 'contenu' :
        if (typeof jsonObjectData.attributes.field_description !== "undefined" && jsonObjectData.attributes.field_description !== null) {
          appendData(jsonObjectData.attributes.field_description.value, 'contenu', resultContainer)
        } else if (typeof jsonObjectData.attributes.body !== "undefined" && jsonObjectData.attributes.body !== null) {
          appendData(jsonObjectData.attributes.body.value, 'contenu', resultContainer)
        }
        break;
      case'image' :
        if (typeof functionToKeepTheImageURL !== "undefined" && typeof jsonObjectData.relationships !== "undefined") {
          getImageURL(jsonObjectData.relationships, functionToKeepTheImageURL)
        }
        break;
      default :
        console.log("'" + contentILookFor[i] + "'" + " Is not something that can be extracted ")
    }
  }
  return resultContainer;
}

export function appendData(jsonKey, keyName, container) {
  if (typeof jsonKey !== "undefined") {
    container[keyName] = jsonKey;
  } else {
    console.log(keyName + 'not found')
  }

}

export function getImageURL(jsonObjectRelation, functionToSaveURL) {
  if (typeof jsonObjectRelation !== "undefined") {
    if (typeof jsonObjectRelation.field_image !== "undefined") {
      if (jsonObjectRelation.field_image.data) {
        if (typeof jsonObjectRelation.field_image.data.id !== "undefined") {

          let imageID = jsonObjectRelation.field_image.data.id
          return fetch(RESSOURCE_URL + "file/file/" + imageID
          ).then(result => result.json()
          ).then(result => {
              console.log(result);
              return result.data.attributes.uri.url
            }
          ).then(result => {
              console.log(result);
              functionToSaveURL(result)
            }
          ).catch(error => console.warn(error))
        } else {
          console.log('The content you asked for does not have an image attached to it')
        }
      }
    }
  } else {
    console.log('The content you asked for does not have an relation')
  }
}

export function connectToGLPI(username, password, setResponse) {
  /*let login = {"username" : username, "password" : password }
  var myInit = {
    method: 'POST',
    body : JSON.stringify(login)
  };

  */
  fetch(BASE_URL + 'glpi?username=' + username + '&password=' + password
  ).then(response => response.json()
  ).then(responseJSON => setResponse(responseJSON)
    /* ).then(responseJSON => {console.log(responseJSON+"->"+responseJSON.session_token ); return responseJSON.session_token}
     ).then(sessionToken => {setToken(sessionToken);console.log('The token has been set !'); return(sessionToken)}
     */).catch(error => console.warn(error))
}

export function createTicket(corps, token, setResponse) {
  console.log("Calling createTicket with token=" + token)
  fetch(BASE_URL + 'glpi?sessionToken=' + token,
    {
      method: 'POST',
      body: JSON.stringify(corps)
    }).then(result => {
    return result.clone().json()
    }
  ).then(resultJSON => {
      console.log(resultJSON);
      setResponse(resultJSON)
    }
  ).catch(error => console.warn(error.message))

}
