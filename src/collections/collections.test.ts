import { describe, it, expect } from 'vitest';
import { Houses } from './Houses';
import { Pages } from './Pages';
import { Users } from './Users';

describe('Houses collection', () => {
  it('slug es "houses"', () => expect(Houses.slug).toBe('houses'));

  it('lectura es pública', () => {
    const access = Houses.access as any;
    expect(access?.read?.()).toBe(true);
  });

  it('tiene draft/versiones habilitadas', () => {
    const versions = Houses.versions as any;
    expect(versions?.drafts).toBe(true);
  });

  it('tiene campo slug único e indexado', () => {
    const slugField = (Houses.fields as any[]).find(f => f.name === 'slug');
    expect(slugField).toBeDefined();
    expect(slugField.unique).toBe(true);
    expect(slugField.index).toBe(true);
  });

  it('tiene campo published', () => {
    const pub = (Houses.fields as any[]).find(f => f.name === 'published');
    expect(pub).toBeDefined();
    expect(pub.defaultValue).toBe(true);
  });

  it('tiene metadatos SEO (meta.title + meta.description)', () => {
    const meta = (Houses.fields as any[]).find(f => f.name === 'meta');
    expect(meta?.type).toBe('group');
    const metaTitle = meta.fields.find((f: any) => f.name === 'title');
    const metaDesc = meta.fields.find((f: any) => f.name === 'description');
    expect(metaTitle).toBeDefined();
    expect(metaDesc).toBeDefined();
    expect(metaDesc.maxLength).toBe(200);
  });
});

describe('Pages collection', () => {
  it('slug es "pages"', () => expect(Pages.slug).toBe('pages'));

  it('lectura es pública', () => {
    const access = Pages.access as any;
    expect(access?.read?.()).toBe(true);
  });

  it('tiene draft/versiones habilitadas', () => {
    const versions = Pages.versions as any;
    expect(versions?.drafts).toBe(true);
  });
});

describe('Users collection', () => {
  it('slug es "users"', () => expect(Users.slug).toBe('users'));

  it('auth está habilitado', () => expect((Users as any).auth).toBe(true));

  it('roles son admin y editor', () => {
    const roleField = (Users.fields as any[]).find(f => f.name === 'role');
    expect(roleField).toBeDefined();
    const values = roleField.options.map((o: any) => o.value);
    expect(values).toContain('admin');
    expect(values).toContain('editor');
  });

  it('role por defecto es editor (no admin)', () => {
    const roleField = (Users.fields as any[]).find(f => f.name === 'role');
    expect(roleField.defaultValue).toBe('editor');
  });

  it('nombre es obligatorio', () => {
    const nameField = (Users.fields as any[]).find(f => f.name === 'name');
    expect(nameField?.required).toBe(true);
  });

  it('NO tiene read público (requiere auth)', () => {
    const access = (Users as any).access;
    expect(access?.read?.()).not.toBe(true);
  });
});
