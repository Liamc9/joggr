// IMPORTS
import { useState, useEffect } from 'react'
import { TabGroup} from 'liamc9npm'

// CREATE FUNCTION
export default function Pals() {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = ['Pals', 'Groups'];
      
    // HTML
    return (
        <>
        <div>
        <TabGroup tabs={tabs} activeColor="var(--color-primary)" activeIndex={activeIndex} onTabChange={setActiveIndex} />
        <div >
          {activeIndex === 0 && <div>This section will be split into individual pals and groups</div>}
          {activeIndex === 1 && <div>Content for Groups</div>}
        </div>
      </div>
        
        </>
    )
}