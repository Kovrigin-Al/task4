import { makeAutoObservable } from "mobx";

export interface IUser {
  id: number;
  name: string;
  email: string;
  last_login_time: Date;
  registration_time: Date;
  status: 'active' | 'blocked'
}

export default class ListStore {
  _items: IUser[];
  isUpdating: string
  constructor() {
    this._items = [
    ];
    this.isUpdating = ''
    makeAutoObservable(this);
  }

  setItems(items: IUser[]) {
    this._items = items.sort((a, b) => a.id - b.id);
  }

  updateItems(items: IUser[]) {
    this._items = [...this._items.filter(i => items.findIndex(newItem => i.id === newItem.id)), ...items]
      .sort((a, b) => a.id - b.id);
    this.isUpdating = Date.now().toString()
  }

  get items() {
    return this._items;
  }
}  