import React, { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    console.log(`loading`);
  }, []);

  return <div>loading...</div>;
}
