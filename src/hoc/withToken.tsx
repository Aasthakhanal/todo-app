const withToken = (WrappedComponent: any) => {
    return (props: any) => {
      const tokenFromHOC = localStorage.getItem("token");
  
      return (
        <WrappedComponent {...props} tokenFromHOC={tokenFromHOC} />
      )
    }
  }
  
  export default withToken;