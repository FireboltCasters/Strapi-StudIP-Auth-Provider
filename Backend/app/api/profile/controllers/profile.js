'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let profile;
    let userId;
    console.log("Handle create Profile");
    try{
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        userId = ctx.state.user.id;
        data.user = userId;
        profile = await strapi.services.profile.create(data, { files });
      } else {
        userId = ctx.state.user.id;
        ctx.request.body.user = userId;
        profile = await strapi.services.profile.create(ctx.request.body);
      }
    } catch (err){
      console.log(err);
      console.log(JSON.stringify(err));
    }
    console.log("Finished Creating Profile");

    return sanitizeEntity(profile, { model: strapi.models.profile });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [profile] = await strapi.services.profile.find({
      id: ctx.params.id,
      'user.id': ctx.state.user.id,
    });

    if (!profile) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.profile.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.profile.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [profile] = await strapi.services.profile.find({
      id: ctx.params.id,
      'user.id': ctx.state.user.id,
    });

    if (!profile) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.profile.delete({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.profile.delete({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },
};
