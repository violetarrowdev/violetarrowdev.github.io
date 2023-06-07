import Console from './Console';

export default function Banner() {
    return (
      <div className="banner">
        <h1>&gt; <Console fullText="VIOLETARROW" useFlasher={true} dontClear={true} /></h1>
      </div>
    )
  }