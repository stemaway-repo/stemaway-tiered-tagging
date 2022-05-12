# frozen_string_literal: true

module StemawayTieredTagging
  class ::SkillsController < ::ApplicationController

    def index
      data = []
      pathway_tag_group = SiteSetting.pathway_tag_group
      pathways = Tag.joins(:tag_group_memberships).where('tag_group_memberships.tag_group_id IN (?)', TagGroup.where(name: pathway_tag_group).first).select(:id, :name, :description)

      pathways.each do |pathway|
        skills = Tag.joins(:tag_group_memberships).where('tag_group_memberships.tag_group_id IN (?)', TagGroup.where(name: pathway[:name].titleize).first).select(:id, :name, :description)

        if skills.present?
          all_skills = []
          skills.each do |skill|
            sub_skills = Tag.joins(:tag_group_memberships).where('tag_group_memberships.tag_group_id IN (?)', TagGroup.where(name: skill[:name].titleize).first).select(:id, :name, :description)

            if (sub_skills.present?)
              all_skills.push({
                id: skill[:id],
                name: skill[:name],
                description: skill[:description],
                skills: sub_skills
              })
            else
              all_skills.push({
                id: skill[:id],
                name: skill[:name],
                description: skill[:description],
                skills: []
              })
            end
          end
        else
          all_skills = []
        end

        data << {
          id: pathway[:id],
          name: pathway[:name],
          description: pathway[:description],
          skills: all_skills
        }
      end

      render json: data
    end
  end
end
