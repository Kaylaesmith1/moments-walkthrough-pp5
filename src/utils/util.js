import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// resource component below can be used for comments or profiles
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
    //   reduce method looks through new page of results we get from the API
      results: data.results.reduce((acc, cur) => {
        // looks through array of posts in accumulater. If sum method is true, it matches the id of a post already there and won't display it again.
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
        //   if no id match (below), new post is displayed.
          : [...acc, cur];
        //   new results are added (below) to existing results
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...profile, following_count: profile.following_count + 1 }
    : // this is not the profile the user clicked on or the profile
      // the user owns, so just return it unchanged
      profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? 
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? 
      { ...profile, following_count: profile.following_count - 1 }
    : 
      profile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
