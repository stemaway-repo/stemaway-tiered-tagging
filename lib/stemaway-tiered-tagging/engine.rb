# frozen_string_literal: true

module ::StemawayTieredTagging
  class Engine < ::Rails::Engine
    engine_name "stemaway_tiered_tagging".freeze
    isolate_namespace StemawayTieredTagging
  end
end
