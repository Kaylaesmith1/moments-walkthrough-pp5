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