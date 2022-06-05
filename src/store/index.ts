import { configure } from "mobx"
import User from './user';

configure({
    enforceActions: "never",
})

export default {
  user: new User()
}