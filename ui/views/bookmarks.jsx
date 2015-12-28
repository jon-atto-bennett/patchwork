'use babel'
import React from 'react'
import pull from 'pull-stream'
import mlib from 'ssb-msgs'
import { LocalStoragePersistedComponent } from '../com'
import LeftNav from '../com/leftnav'
import MsgList from '../com/msg-list'
import Oneline from '../com/msg-view/oneline'
import Summary from '../com/msg-view/summary'
import app from '../lib/app'

const LISTITEMS = [
  { label: <span><i className="fa fa-list"/> View: Large</span>, Component: Summary },
  { label: <span><i className="fa fa-list"/> View: Compact</span>, Component: Oneline }
]
const LISTITEM_CARD = LISTITEMS[0]
const LISTITEM_ONELINE = LISTITEMS[1]

export default class Bookmarks extends LocalStoragePersistedComponent {
  constructor(props) {
    super(props, 'msgList', {
      currentMsgView: 0
    })
  }

  cursor (msg) {
    if (msg)
      return [msg.ts, false]
  }

  onToggleMsgView() {
    this.setState({ currentMsgView: +(!this.state.currentMsgView) })
  }

  onMarkAllRead() {
    alert('todo')    
  }

  render() {
    const listItem = LISTITEMS[this.state.currentMsgView]
    const ListItem = listItem.Component

    const Toolbar = props => {    
      return <div className="flex light-toolbar">
        <a onClick={()=>alert('todo')}><i className="fa fa-envelope-o" /> Compose Public Message</a>
        <div className="flex-fill"/>
        <a onClick={this.onMarkAllRead.bind(this)}><i className="fa fa-check-square" /> Mark All Read</a>
        <a onClick={this.onToggleMsgView.bind(this)}>{listItem.label}</a>
      </div>
    }

    return <div id="bookmarks">
      <MsgList
        ref="list"
        threads
        dateDividers
        Hero={Toolbar}
        ListItem={ListItem} listItemProps={{ userPic: true }}
        LeftNav={LeftNav} leftNavProps={{ location: this.props.location }}
        live={{ gt: [Date.now(), null] }}
        emptyMsg="Your bookmarks view is empty."
        source={app.ssb.patchwork.createBookmarkStream}
        cursor={this.cursor} />
    </div>
  }
}