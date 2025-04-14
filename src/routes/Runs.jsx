
// IMPORTS
import { useState, useEffect } from 'react'
import { TabGroup} from 'liamc9npm'

// CREATE FUNCTION
export default function Runs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabs = ['Upcoming', 'Past'];
      
    // HTML
    return (
        <>
        <div>
        <TabGroup tabs={tabs} activeColor="var(--color-primary)" activeIndex={activeIndex} onTabChange={setActiveIndex} />
        <div >
          {activeIndex === 0 && <div>        This section will be split into past and upcoming runs. Can either post run here or can do the big plus in the middle of the bottom nav bar
            </div>}
          {activeIndex === 1 && <div>Content for Past</div>}
        </div>
      </div>
        
        </>
    )
}